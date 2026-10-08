import { defineConfig, tierPresets } from '@lizardbyte/contribkit'

export default defineConfig({
  tiers: [
    {
      title: 'Noobs',
      preset: tierPresets.base,
    },
    {
      title: 'Hackers',
      monthlyDollars: 12,
      preset: tierPresets.medium,
    },
    {
      title: 'Wizards',
      monthlyDollars: 25,
      preset: tierPresets.large,
    },
    {
      title: 'Legends',
      monthlyDollars: 50,
      preset: tierPresets.xl,
    },
    {
      title: 'Champions',
      monthlyDollars: 150,
      preset: tierPresets.xl,
    },
  ],
})
