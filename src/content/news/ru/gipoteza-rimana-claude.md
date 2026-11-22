---
title: "Математики подтвердили доказательство гипотезы Римана с Claude"
slug: "gipoteza-rimana-claude"
date: 2026-11-22
lang: ru
description: "20 ноября математик Anthropic Левент Алпёге заявил, что вместе с Claude доказал гипотезу Римана. 21 ноября сообщества Lean и Mathlib подтвердили доказательство."
image: "/images/news/claude-riemann-hypothesis.webp"
imageAlt: "Огромные каменные ворота в тёмном каньоне расходятся, и сквозь щель бьёт столб золотого света."
sources:
  - title: "The AI Riemann hypothesis proof is true, independent mathematicians confirm (Scientific American)"
    url: "https://www.scientificamerican.com/article/the-ai-riemann-hypothesis-proof-is-almost-certainly-true-independent-mathematicians-attest/"
  - title: "Lean verification of the Riemann Hypothesis (Lean and Mathlib communities)"
    url: "https://leanprover-community.github.io/blog/posts/riemann-hypothesis/"
  - title: "Two groups verify mathematician’s claim that Claude helped prove mathematics problem (The Guardian)"
    url: "https://www.theguardian.com/technology/2026/nov/21/anthropic-riemann-hypothesis-solved-claude-ai"
  - title: "Anthropic worker says AI helped him find proof of the Riemann Hypothesis (AP News)"
    url: "https://apnews.com/article/anthropic-claude-math-solution-ai-4fe8b69a891f160f9e7f0c85af8c55c8"
translationKey: "claude-riemann-hypothesis"
tags:
  - news
  - anthropic
  - claude
cta: telegram
draft: false
---

20 ноября математик Anthropic Левент Алпёге заявил, что вместе с моделью Claude доказал гипотезу Римана — одну из самых известных задач в математике, которая до этой недели оставалась открытой больше 160 лет. На следующий день сообщества Lean и Mathlib, которые поддерживают язык для проверки доказательств, выпустили совместное заявление: и формулировка теоремы, и само доказательство признаны верными.

Гипотезу в 1859 году выдвинул Бернхард Риман. Простыми словами, она утверждает, что в распределении простых чисел — тех, что делятся только на себя и на единицу, — есть скрытая закономерность. Алпёге опубликовал заметку на личном сайте в пятницу, на следующий день после выхода Anthropic на биржу, и написал, что работа с Claude заняла около шести недель. «Claude and I have had a great time together with such breadth in recent months, but this time Claude far outpaced me near the finish line», — приводит его слова The Guardian. Он же назвал момент публикации «ужасным» и сказал, что закончил бы раньше, если бы мог.

## Как доказательство проверяли

Аргумент Алпёге записал на Lean — это язык программирования, которым проверяют, что каждый шаг доказательства логически верен. Если код на Lean собирается без ошибок, это обычно считают знаком, что логика сходится. Scientific American отмечает, что остаются ещё два вопроса: действительно ли код доказывает саму гипотезу Римана, а не чуть другую теорему, и смогут ли другие математики собрать тот же код у себя.

Эти проверки уже сделаны. В заявлении от 21 ноября, которое поддержали Lean FRO и Mathlib Initiative, сообщества Lean и Mathlib написали: «We have full confidence that Alpöge's proof of the Riemann Hypothesis is correct, and we congratulate him on this achievement». И отдельно: «We hereby certify that both the statement and the proof of the Riemann Hypothesis are correct».

По этому заявлению библиотека занимает 17 миллионов строк на Lean и напрямую зависит только от Mathlib. Десятки человек сообщили, что код собрался и дал один и тот же экспорт доказательства. Отдельным файлом формулировку гипотезы из Mathlib сравнили с теоремой, которую доказал Алпёге, двумя независимыми инструментами. Затем экспорт проверили официальным ядром Lean и несколькими независимыми проверщиками, в том числе написанными на разных языках.

Эндрю Сазерленд, математик Массачусетского технологического института, собрал результат отдельно. «The Lean proof has been compiled and independently rechecked by the Lean kernel with only the three standard axioms», — сказал он Scientific American. И добавил: «Honestly the chance that anything is fishy here is approximately zero». Журнал после обновления от 21 ноября пишет, что завершили и «comparator run»: проверку, что код тихо не переопределяет символы и не пользуется ошибкой в ядре Lean. Более ранняя редакционная пометка ещё называла материал развивающимся.

Кевин Баззард из Имперского колледжа Лондона раньше объяснял, почему одного PDF с кодом на Lean мало: нужно спросить, совпадает ли теорема в коде с той, которую все имеют в виду. Именно этот вопрос сообщества, по их словам, теперь закрыли.

## Что из этого следует — и чего пока нет

Это формальная проверка заявленного доказательства, а не анонс самой Anthropic. Алпёге описал работу как совместную с Claude, а не как текст, который модель просто выдала целиком. Сообщества Lean пишут, что ждут следующей части: объяснить новые идеи доказательства человеческим языком. Это ещё впереди.

Для тех, кто собирает продукты с ИИ, урок знакомый. Модель может взять на себя удивительно большую часть трудной работы, но результат всё равно нужно проверить так, чтобы его могли повторить другие. Сайт или приложение на Lovable, Bolt, Cursor или v0 — это меньшая версия той же задачи: последняя миля по-прежнему в проверке, входе, оплате и деплое, который выдерживает нагрузку.

Если вы как раз на этой последней миле застряли, мы помогаем чинить и запускать сайты и приложения, собранные с ИИ. Напишите в [Telegram-бот](https://t.me/Inqreon_bot) или загляните на [страницу услуг](https://inqreon.com/en/).
