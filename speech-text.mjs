// Decorations stay in the interface, but never become spoken words.
export function speechText(text){const cleaned=String(text).replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}\uFE0E\uFE0F\u200D\u20E3\u{E0020}-\u{E007F}]/gu,'').replace(/\s+/g,' ').trim();return /[\p{L}\p{N}]/u.test(cleaned)?cleaned:'';}
