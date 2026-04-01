<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @if(!empty($ssrHead))
        {!! $ssrHead !!}
    @else
        <title>{{ $ssrData['blog']['title'] ?? 'EdgeLancer – n8n Workflow Automation Templates & AI Agents' }}</title>
        <!-- Metadata -->
        <meta name="title" content="{{ $ssrData['blog']['title'] ?? 'EdgeLancer – n8n Workflow Automation Templates & AI Agents' }}">
        <meta name="description" content="{{ $ssrData['blog']['description'] ?? 'Download ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer.' }}">
        
        <!-- OpenGraph -->
        <meta property="og:type" content="{{ !empty($ssrData['blog']) ? 'article' : 'website' }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ $ssrData['blog']['title'] ?? 'EdgeLancer – n8n Workflow Automation Templates & AI Agents' }}">
        <meta property="og:description" content="{{ $ssrData['blog']['description'] ?? 'Discover powerful n8n automation templates and AI workflows to automate your business processes.' }}">
        <meta property="og:image" content="{{ $ssrData['blog']['image_url'] ?? url('/og-image.png') }}">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@edgelancer">
        <meta name="twitter:title" content="{{ $ssrData['blog']['title'] ?? 'EdgeLancer – Automation Templates & AI Agents' }}">
        <meta name="twitter:description" content="{{ $ssrData['blog']['description'] ?? 'Download ready-to-use n8n workflow automation templates and AI agents.' }}">
        <meta name="twitter:image" content="{{ $ssrData['blog']['image_url'] ?? url('/og-image.png') }}">
    @endif
    @if(str_contains(request()->getHost(), 'hstgr.cloud') || str_contains(request()->getHost(), 'srv1381478'))
        <meta name="robots" content="noindex, follow">
    @endif

    <!-- Scripts (Analytics) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-99XSN4QY3C"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-99XSN4QY3C');
    </script>
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","vof2qorxev");
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="antialiased font-sans text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100">
    @if(!empty($ssrData['blog']) && empty($ssrHtml))
        <div id="seo-fallback-content" style="display: none;">
            <h1>{{ $ssrData['blog']['title'] ?? '' }}</h1>
            <p>{{ $ssrData['blog']['description'] ?? '' }}</p>
            <div>{!! $ssrData['blog']['content'] ?? '' !!}</div>
        </div>
    @endif

    <div id="root">@if(!empty($ssrHtml)){!! $ssrHtml !!}@endif</div>

    @if(!empty($ssrData))
    <script>
        window.__SSR_DATA__ = {!! json_encode($ssrData) !!};
    </script>
    @endif
</body>
</html>
