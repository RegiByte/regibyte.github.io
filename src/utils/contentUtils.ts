import { getCollection } from 'astro:content';

export async function getActiveEffects() {
  const effects = await getCollection('effects')

  return effects.filter(effect => !effect.data.disabled)
    .sort((effectA, effectB) => {
      const aDate = new Date(`${effectA.data.date}T00:00:00Z`).getTime()
      const bDate = new Date(`${effectB.data.date}T00:00:00Z`).getTime()
      return bDate - aDate
    })
}