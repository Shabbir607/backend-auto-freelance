import { cG as howlerExports } from "./vendor-oSjIcCqY.js";
import "stream";
import "util";
const sounds = {};
function getSound(name) {
  if (!sounds[name]) {
    const soundUrls = {
      newMessage: "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3",
      notification: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
      success: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
      error: "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3"
    };
    sounds[name] = new howlerExports.Howl({
      src: [soundUrls[name] || soundUrls.notification],
      volume: 0.5,
      preload: true
    });
  }
  return sounds[name];
}
function playNotificationSound(type = "notification") {
  try {
    const sound = getSound(type);
    sound.play();
  } catch (e) {
    console.warn("Could not play notification sound:", e);
  }
}
export {
  playNotificationSound
};
