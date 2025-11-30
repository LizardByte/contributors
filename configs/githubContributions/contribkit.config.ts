import { defineConfig, tierPresets } from '@lizardbyte/contribkit'

export default defineConfig({
  githubContributions: {
    login: process.env.CONTRIBKIT_GITHUB_CONTRIBUTIONS_LOGIN,
    token: process.env.CONTRIBKIT_GITHUB_CONTRIBUTIONS_TOKEN,
    logarithmicScaling: false,
    maxContributions: 100,
  },
  renderer: 'circles',
  width: 1000,
  circles: {
    radiusMax: 100,
    radiusMin: 1,
    radiusPast: 1,
  },
  tiers: [
    {
      title: 'Repo',
      preset: tierPresets.base,
    },
  ],
})
