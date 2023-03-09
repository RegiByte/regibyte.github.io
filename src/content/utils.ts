import { getCollection } from 'astro:content';

export async function getActiveEffects() {
  const effects = await getCollection('effects')

  return effects.filter(effect => !effect.data.disabled)
}