import { Howl } from 'howler';

const sounds: Record<string, Howl> = {};

// Initialize sounds lazily
function getSound(name: string): Howl {
  if (!sounds[name]) {
    const soundUrls: Record<string, string> = {
      newMessage: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
      notification: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
      success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
    };
    
    sounds[name] = new Howl({
      src: [soundUrls[name] || soundUrls.notification],
      volume: 0.5,
      preload: true,
    });
  }
  return sounds[name];
}

export function playNotificationSound(type: 'newMessage' | 'notification' | 'success' | 'error' = 'notification') {
  try {
    const sound = getSound(type);
    sound.play();
  } catch (e) {
    console.warn('Could not play notification sound:', e);
  }
}

export function setNotificationVolume(volume: number) {
  Object.values(sounds).forEach(sound => {
    sound.volume(Math.max(0, Math.min(1, volume)));
  });
}
