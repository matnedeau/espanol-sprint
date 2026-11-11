import { A1_LESSONS } from './a1';
import { A2_LESSONS } from './a2';
import { B1_LESSONS } from './b1';
import { B2_LESSONS } from './b2';
import { C1_LESSONS } from './c1';
import { buildLesson, type AuthoredLesson } from './types';

// Les 100 leçons du parcours, rédigées à la main, par numéro.
export const AUTHORED_LESSONS: Record<number, AuthoredLesson> = Object.fromEntries(
  [...A1_LESSONS, ...A2_LESSONS, ...B1_LESSONS, ...B2_LESSONS, ...C1_LESSONS].map((lesson) => [lesson.id, lesson]),
);

/** Cartes d'une leçon rédigée, ou null si elle n'a pas encore été réécrite. */
export const getAuthoredLesson = (id: number) => (AUTHORED_LESSONS[id] ? buildLesson(AUTHORED_LESSONS[id]) : null);
