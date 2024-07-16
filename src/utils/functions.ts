import {
  gapTrendingContainer,
  paddingLeftTrendingContainer,
  widthCatalogTrending,
} from '@/styles/style-values';

function roundNumber(number: number): number {
  // Se a parte decimal do número for maior que 0.85, arredonde para cima
  if (number % 1 < 0.85) {
    return Math.ceil(number) - 1;
  } else {
    // Caso contrário, mantenha o número original
    return number;
  }
}

export function getMoveValue(width: number) {
  //gap
  const contentSize = (widthCatalogTrending + gapTrendingContainer * 4) / 2;
  const result = roundNumber(width / contentSize);
  return result * contentSize;
}
