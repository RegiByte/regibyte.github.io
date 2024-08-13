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

export async function getActiveAnimations() {
  const scenes = await getCollection('animations')

  return scenes.filter(scene => !scene.data.disabled)
    .sort((sceneA, sceneB) => {
      const aDate = new Date(`${sceneA.data.date}T00:00:00Z`).getTime()
      const bDate = new Date(`${sceneB.data.date}T00:00:00Z`).getTime()
      return bDate - aDate
    })
}
