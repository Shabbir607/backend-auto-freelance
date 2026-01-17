<?php

namespace App\Services;

use App\Models\Translation;
use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    protected $sourceLang = 'en';

    /**
     * Translate text and cache the result.
     *
     * @param string $text
     * @param string $targetLang
     * @return string
     */
    public function translate(string $text, string $targetLang): string
    {
        if (empty($text)) {
            return '';
        }

        if ($targetLang === $this->sourceLang) {
            return $text;
        }

        $hash = md5($text);
        $cacheKey = "trans_{$targetLang}_{$hash}";

        // 1. Check Cache
        return Cache::rememberForever($cacheKey, function () use ($text, $targetLang, $hash) {
            // 2. Check Database
            $translation = Translation::where('source_text_hash', $hash)
                ->where('target_language', $targetLang)
                ->first();

            if ($translation) {
                return $translation->translated_text;
            }

            // 3. Call Google Translate
            try {
                $tr = new GoogleTranslate();
                $tr->setSource($this->sourceLang);
                $tr->setTarget($targetLang);
                $translatedText = $tr->translate($text);

                // 4. Store in Ref DB
                Translation::create([
                    'source_text' => $text,
                    'source_text_hash' => $hash,
                    'target_language' => $targetLang,
                    'translated_text' => $translatedText,
                ]);

                return $translatedText;
            } catch (\Exception $e) {
                Log::error("Translation failed for '{$text}' to '{$targetLang}': " . $e->getMessage());
                return $text; // Fallback to original
            }
        });
    }

    /**
     * Detect or get the preferred language.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function getLocaleData($request): array
    {
        // 1. User Selection (e.g., query param or header)
        $lang = $request->query('lang') 
             ?? $request->header('X-App-Locale') 
             ?? $request->cookie('app_locale');

        // 2. GeoIP or Accept-Language if no explicit selection
        if (!$lang) {
            // Try GeoIP if installed/configured, else Accept-Language
            try {
                // If you have geoip package: $location = geoip($request->ip()); $lang = $location->iso_code ...
                // For now, simpler approach:
                if ($request->header('Accept-Language')) {
                    $lang = substr($request->header('Accept-Language'), 0, 2);
                }
            } catch (\Exception $e) {
                // Ignore
            }
        }

        // 3. Fallback
        if (!$lang || !in_array($lang, $this->getSupportedLanguages())) {
            $lang = 'en';
        }

        // Return config dynamically
        $isRtl = in_array($lang, ['ar', 'he', 'fa', 'ur']);
        
        return [
            'locale' => $lang,
            'direction' => $isRtl ? 'rtl' : 'ltr',
            'html_attrs' => "lang=\"{$lang}\" dir=\"" . ($isRtl ? 'rtl' : 'ltr') . "\"",
        ];
    }

    public function getSupportedLanguages()
    {
        // This could be dynamic from DB or config
        return ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'tr', 'nl'];
    }
}
