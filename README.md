# Token Lab — assignment submission

Topic 1: Tokenization and Context Window Management

Applicant: Dhruv Bamal
Format: a 45-minute self-paced interactive lesson for AI beginners.

## Quick start — no installation required

1. Extract this entire ZIP. Do not open files while they are still inside the ZIP viewer.
2. Open **website/index.html** in a modern desktop browser such as Chrome, Edge, Firefox, or Safari. Keep app.js, styles.css, and favicon.svg in the same folder.
3. Select **Enter the lab** and follow the five sections. No API key, account, or paid service is needed.

All functional code and tokenizer vocabulary are bundled locally. Google Fonts is optional and falls back to system fonts without internet. External source links need internet. Local progress storage depends on browser policy, especially for file URLs.

If local-file access is restricted, run `python3 -m http.server 8000 --directory website` from this folder and open http://localhost:8000. Mobile reviewers should use a hosted copy or a laptop to open the extracted package.

## Edit and rebuild

Use Node.js 22.13+ and npm. From this folder run:

```sh
npm install
npm test
npm run build
```

Then reopen website/index.html. The shipped prebuilt site does not need these commands. Source and prebuilt files represent the same lesson.

## What is included

- app/page.tsx — React lesson and interaction components
- app/globals.css — responsive styles and motion controls
- lib/learning.mjs — BPE, budget, and scenario logic
- tests/learning.test.mjs — executable tests
- entry.tsx / build.mjs / package.json — standalone build
- website/ — ready-to-open app with bundled tokenizer data
- docs/LESSON_PLAN.md — goals, 45-minute pacing, design decisions
- docs/VIDEO_GUIDE.md — explanation-video rehearsal outline
- docs/SUBMISSION_CHECKLIST.md — final handoff checks
- THIRD_PARTY_NOTICES.md and website/app.js.LEGAL.txt — dependency attribution

## Honest technical scope

Token counts in the playground are real plain-text counts from js-tiktoken using cl100k_base and o200k_base. Token IDs and complete-string decoding are exact for the selected encoding. Chat message framing is not included.

The BPE trainer is a tiny character-based teaching model. The 1,024-token context window and mission document sizes are illustrative. Assistant feedback is deterministic; no LLM, summarizer, or retrieval backend is called. Each simulation is labelled in the interface.

The lesson supports keyboard input, visible focus, reduced motion, mobile layouts, local learner progress, feedback, and downloadable reflection notes. No formal accessibility conformance or learner-pilot claim is made.

## AI assistance and ownership

Developed for this assignment with AI assistance for design, implementation, content, and testing. The applicant should review, understand, customize where appropriate, and explain the submitted work. The required explanation video must be recorded separately with the applicant's own narration. Do not represent generated code as independently authored without assistance.

## Sharing

Submit this ZIP directly, or put its contents in your own public GitHub repository. You can also host the website folder with any static web host; the hosted lesson does not require a backend. Confirm reviewer access before using a link. An owner-private preview is not a public submission link.

## Sources

- https://github.com/openai/tiktoken
- https://huggingface.co/learn/llm-course/chapter6/5
- https://developers.openai.com/api/docs/guides/conversation-state
- https://github.com/dqbd/tiktoken/tree/main/js

Reviewed 7 November 2026.
