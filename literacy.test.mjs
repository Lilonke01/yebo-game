import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {readingStories,wordPractice,literacyVoiceTexts,correctOrder} from './literacy.mjs';
import {voiceFiles} from './voice-map.mjs';
test('each story has literal, reason and inference questions with valid choices',()=>{
 assert.equal(readingStories.length,2);
 for(const story of readingStories){assert.ok(story.sentences.length>=5);assert.equal(story.questions.length,4);for(const q of story.questions){assert.ok(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.hint);}assert.ok(story.questions.some(q=>q.skill==='Make an inference'));assert.equal(story.order.length,3);}
 for(const word of wordPractice)assert.ok(word.options.includes(word.word));
});
test('sequence and sentence checks require every element in the right order',()=>{
 assert.equal(correctOrder([0,1,2],[0,1,2]),true);assert.equal(correctOrder([1,0,2],[0,1,2]),false);assert.equal(correctOrder([0,1],[0,1,2]),false);assert.equal(correctOrder([2,1,0],[2,1,0]),true);
});
test('English literacy narration is bundled for every supported instruction and sentence',async()=>{
 for(const text of literacyVoiceTexts()){assert.ok(voiceFiles[text],text);assert.ok((await fs.stat('audio/'+voiceFiles[text])).size>1000);}
});
import {wordPuzzles,selectedLine,matchedWord} from './word-search.mjs';
test('word searches contain four real story words with valid straight paths',()=>{wordPuzzles.forEach((p,i)=>{assert.equal(p.rows.length,6);assert.ok(p.rows.every(r=>r.length===6));assert.equal(p.words.length,4);for(const w of p.words){assert.ok(readingStories[i].sentences.join(' ').toUpperCase().includes(w.word));assert.equal(w.cells.map(c=>p.rows.join('')[c]).join(''),w.word);assert.equal(matchedWord(p,w.cells[0],w.cells.at(-1)),w.word);assert.equal(matchedWord(p,w.cells.at(-1),w.cells[0]),w.word);}});});
test('word search rejects diagonals, row wrapping and partial words',()=>{assert.deepEqual(selectedLine(5,6),[]);assert.deepEqual(selectedLine(0,7),[]);assert.deepEqual(selectedLine(-1,2),[]);assert.equal(matchedWord(wordPuzzles[0],1,2),null);assert.equal(matchedWord(wordPuzzles[0],0,5),null);});
