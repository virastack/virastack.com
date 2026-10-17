---
name: academy-ders
description: >-
  ViraStack Academy'ye ders veya track eklerken yalnızca content/tr
  dosyalarını günceller. curriculum.json, ders markdown'ı, slug,
  translationKey ve iç link kurallarını uygular. content/en altına markdown
  açılmaz. Academy dersi, müfredat, curriculum veya .content/academy
  üzerinde çalışırken kullan.
---

# Academy dersi

İçerik `.content/academy` içindedir. Remote: `https://github.com/virastack/academy.git`, dal `main`. Site build'i bu dalı klonlar. Yerel içerik değişikliği push edilmeden yayına gitmez.

Şimdilik yalnızca Türkçe içerik yazılır ve güncellenir. `content/en/**` altına markdown açma. `content/en/curriculum.json` da oluşturma.

## Dosyalar

```
content/tr/curriculum.json
content/tr/<track>/<slug>.md
```

`title` ve `description` Türkçe düz stringdir. `{ "tr", "en" }` nesnesi yazılmaz.

## Slug

- Ders ve track slug'ı İngilizce `kebab-case` olur.
- Dosya adı slug ile aynıdır: `content/tr/<track>/<slug>.md`.
- `translationKey` tam olarak `<track>/<slug>` olur.
- İç link `/academy/<track>/<slug>` biçimindedir.
- Grup `id` URL değildir. Mevcut Türkçe id'ler (`temeller`, `react-ekosistemi`, `state-ve-veri-yonetimi`, `test-ve-kalite`, `ileri-seviye`, `takim-ve-sektor`) korunur.
- Eski slug için yönlendirme eklenmez. Eski adres 404 döner.

## Durum

- `published`: `content/tr/<track>/<slug>.md` zorunludur.
- `coming_soon`: müfredatta durur, markdown dosyası yoktur.
- `kind` yalnızca `lesson`, `project` veya `reference` olur.

## Yeni published ders

1. Ders nesnesini yalnızca `content/tr/curriculum.json` içine ekle.
2. Yalnızca `content/tr/<track>/<slug>.md` oluştur.
3. Frontmatter:

```yaml
---
title: "..."
description: "..."
lastVerified: "YYYY-MM-DD"
translationKey: "<track>/<slug>"
---
```

4. Dersin içindeki Academy linklerini yeni slug'a çek. Düz metni bu yüzden yeniden yazma.

## Yeniden adlandırma

Dosyayı `content/tr` içinde `git mv` ile taşı. Müfredattaki slug'ı, dosyanın `translationKey` değerini ve slug içeren linkleri güncelle. Markdown gövdesine dokunma.

## Yeni track

Track slug'ı `content/tr/curriculum.json` içinde İngilizce olur. Sitede ikon için `src/features/academy/constants/track-icon.constants.ts` içine bu slug eklenir. Ders eklemek mevcut track'te site kodu gerektirmez.

## Kontrol

- Her published slug için `content/tr/<track>/<slug>.md` var.
- `content/en` altında markdown yok.
- Dosyanın `translationKey` değeri `<track>/<slug>`.
- Eski ders adresi 404; yeni adres açılıyor.

Website reposuna commit yalnızca kullanıcı isterse atılır. Academy reposuna commit ve push, kullanıcı remote'un güncellenmesini istediğinde yapılır.
