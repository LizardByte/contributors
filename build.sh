#!/usr/bin/env bash
set -e

repos=(
  "build-deps"
  "contribkit"
  "Sunshine"
)

crowdin_projects=(
  606145
  614257
)

output_dir="$(pwd)/dist"

echo "Building sponsors..."
pushd configs/sponsors || exit 1
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors --force
npx contribkit --outputDir="${output_dir}" -w=1800 --name=sponsors.wide
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors.part1 --filter=">=9.9"
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors.part2 --filter="<9.9"
popd || exit 1

echo "Building GitHub contributors..."
pushd configs/github || exit 1
for repo in "${repos[@]}"; do
  echo "Building GitHub contributors for ${repo}..."
  export CONTRIBKIT_GITHUB_CONTRIBUTORS_REPO="${repo}"
  npx contribkit --outputDir="${output_dir}" -w=800 --name="github.${repo}" --force
done
popd || exit 1

echo "Building CrowdIn contributors..."
pushd configs/crowdin || exit 1
for project in "${crowdin_projects[@]}"; do
  echo "Building CrowdIn contributors for project ${project}..."
  export CONTRIBKIT_CROWDIN_PROJECT_ID="${project}"
  npx contribkit --outputDir="${output_dir}" -w=800 --name="crowdin.${project}" --force
done
popd || exit 1

echo "Done!"
