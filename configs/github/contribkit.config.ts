import { defineConfig, tierPresets } from '@lizardbyte/contribkit'

export default defineConfig({
  tiers: [
    {
      title: 'Noobs',
      preset: tierPresets.base,
    },
    {
      title: 'Hackers',
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: 'Wizards',
      monthlyDollars: 50,
      preset: tierPresets.large,
    },
    {
      title: 'Legends',
      monthlyDollars: 100,
      preset: tierPresets.xl,
    },
    {
      title: 'Champions',
      monthlyDollars: 300,
      preset: tierPresets.xl,
    },
  ],
})
