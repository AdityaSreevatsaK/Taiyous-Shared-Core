/**
 * Single source of truth for the desktop cinematic portal silhouettes.
 *
 * All points share a 1648 × 928 reference viewport. Opposing curved seams
 * are generated from the SAME centreline, with a positive gutter. The
 * artwork clip and the metallic border use the exact same SVG path.
 *
 * Tablet/phone layouts deliberately retain independent, simplified masks.
 */
export const PORTAL_STAGE = { width: 1648, height: 928 } as const;
export type PortalKey = 'novel' | 'manga' | 'anime' | 'movies';
export type PortalBounds = { x: number; y: number; width: number; height: number };
type SeamNode = { x: number; y: number; gap: number };

const upperSeam: readonly SeamNode[] = [
  { x: 1150, y: 110, gap: 10 },
  { x: 1149, y: 138, gap: 10 },
  { x: 1138, y: 215, gap: 11 },
  { x: 1122, y: 316, gap: 11 },
  { x: 1113, y: 391, gap: 9 },
  { x: 1105, y: 447, gap: 8 },
  { x: 1100, y: 472, gap: 8 },
];

const lowerSeam: readonly SeamNode[] = [
  { x: 1127, y: 501, gap: 31 },
  { x: 1117, y: 539, gap: 26 },
  { x: 1095, y: 621, gap: 18 },
  { x: 1073, y: 708, gap: 12 },
  { x: 1060, y: 769, gap: 10 },
  { x: 1046, y: 824, gap: 9 },
  { x: 1035, y: 852, gap: 9 },
];

function position(point: SeamNode, side: -1 | 1): string {
  return `${point.x + side * point.gap} ${point.y}`;
}

function startOf(nodes: readonly SeamNode[], side: -1 | 1): string {
  return position(nodes[0]!, side);
}

function lastOf(nodes: readonly SeamNode[], side: -1 | 1): string {
  return position(nodes[6]!, side);
}

/** Exactly two cubic segments, joining all seven shared control nodes. */
function forwards(nodes: readonly SeamNode[], side: -1 | 1): string {
  return `C ${position(nodes[1]!, side)} ${position(nodes[2]!, side)} ${position(nodes[3]!, side)}
    C ${position(nodes[4]!, side)} ${position(nodes[5]!, side)} ${position(nodes[6]!, side)}`;
}

function backwards(nodes: readonly SeamNode[], side: -1 | 1): string {
  return `C ${position(nodes[5]!, side)} ${position(nodes[4]!, side)} ${position(nodes[3]!, side)}
    C ${position(nodes[2]!, side)} ${position(nodes[1]!, side)} ${position(nodes[0]!, side)}`;
}

const paths: Record<PortalKey, string> = {
  novel: `M 706 111 C 829 104 1014 110 ${startOf(upperSeam, -1)}
    ${forwards(upperSeam, -1)}
    C 1064 483 977 488 883 489 L 640 489
    Q 615 489 624 458 L 666 179
    Q 677 120 706 111 Z`,
  manga: `M ${startOf(upperSeam, 1)}
    C 1310 102 1490 106 1605 109
    Q 1632 109 1632 139 L 1632 407
    Q 1632 457 1555 478 C 1525 489 1434 489 1330 489
    L 1118 489 Q 1103 489 ${lastOf(upperSeam, 1)}
    ${backwards(upperSeam, 1)} Z`,
  anime: `M 705 501 C 811 496 968 496 ${startOf(lowerSeam, -1)}
    ${forwards(lowerSeam, -1)}
    Q 985 870 860 871 L 579 871
    Q 549 871 552 844 L 587 585
    Q 598 514 705 501 Z`,
  movies: `M ${startOf(lowerSeam, 1)}
    C 1282 488 1500 491 1615 494
    Q 1632 494 1632 519 L 1632 833
    Q 1630 870 1589 871 L 1064 871
    Q 1042 871 ${lastOf(lowerSeam, 1)}
    ${backwards(lowerSeam, 1)} Z`,
};

export const DESKTOP_PORTALS: Record<PortalKey, { bounds: PortalBounds; path: string }> = {
  novel: { bounds: { x: 615, y: 103, width: 543, height: 389 }, path: paths.novel },
  manga: { bounds: { x: 1098, y: 103, width: 537, height: 389 }, path: paths.manga },
  anime: { bounds: { x: 548, y: 493, width: 579, height: 381 }, path: paths.anime },
  movies: { bounds: { x: 1038, y: 489, width: 597, height: 385 }, path: paths.movies },
};

export const MOBILE_PORTAL_MASKS: Record<PortalKey, string> = {
  novel: 'M .24 .016 C .49 -.006 .74 .014 .946 .009 C 1.006 .007 1.01 .048 .996 .13 L .933 .768 C .919 .906 .828 .983 .632 .99 L .058 .997 C .006 1.001 .002 .976 .006 .895 L .087 .223 C .107 .107 .156 .037 .24 .016 Z',
  manga: 'M .18 .046 C .42 -.015 .71 .001 .935 .012 C 1.017 .019 1.006 .114 .998 .223 L .988 .763 C .988 .899 .916 .953 .789 .979 C .564 1.006 .34 .99 .081 .998 C -.002 1 .002 .948 .006 .845 L .074 .227 C .087 .133 .116 .062 .18 .046 Z',
  anime: 'M .17 .008 C .402 -.012 .722 -.003 .93 .013 C .996 .018 1.007 .073 .99 .18 L .931 .795 C .91 .919 .811 .981 .646 .991 L .085 .997 C -.005 1 .002 .955 .007 .863 L .059 .209 C .076 .104 .105 .031 .17 .008 Z',
  movies: 'M .185 .048 C .42 -.002 .743 -.006 .934 .014 C .996 .019 1.002 .078 .997 .17 L .999 .864 C .998 .942 .966 .989 .866 .991 L .07 .998 C .008 1.002 .003 .955 .009 .865 L .056 .209 C .071 .115 .114 .059 .185 .048 Z',
};

export const MOBILE_PORTAL_BORDERS: Record<PortalKey, string> = {
  novel: 'M240 11 C490 -4 740 10 946 6 C1006 5 1010 34 996 91 L933 538 C919 634 828 688 632 693 L58 698 C6 701 2 683 6 627 L87 156 C107 75 156 26 240 11 Z',
  manga: 'M180 32 C420 -10 710 1 935 8 C1017 13 1006 80 998 156 L988 534 C988 629 916 667 789 685 C564 704 340 693 81 699 C-2 700 2 663 6 592 L74 159 C87 93 116 43 180 32 Z',
  anime: 'M170 6 C402 -8 722 -2 930 9 C996 13 1007 51 990 126 L931 556 C910 643 811 687 646 694 L85 698 C-5 700 2 668 7 604 L59 146 C76 73 105 22 170 6 Z',
  movies: 'M185 34 C420 -1 743 -4 934 10 C996 13 1002 55 997 119 L999 604 C998 660 966 692 866 694 L70 698 C8 701 3 668 9 606 L56 146 C71 81 114 41 185 34 Z',
};

/**
 * An SVG clipPath with objectBoundingBox coordinates can be applied to
 * any desktop card box. The transform maps the shared global path into
 * its precisely matching local CSS rectangle.
 */
export function desktopClipTransform(bounds: PortalBounds): string {
  return `matrix(${1 / bounds.width} 0 0 ${1 / bounds.height} ${-bounds.x / bounds.width} ${-bounds.y / bounds.height})`;
}

export function desktopPortalCSS(bounds: PortalBounds): Record<string, string> {
  return {
    '--portal-x': `${(bounds.x / PORTAL_STAGE.width) * 100}%`,
    '--portal-y': `${(bounds.y / PORTAL_STAGE.height) * 100}%`,
    '--portal-w': `${(bounds.width / PORTAL_STAGE.width) * 100}%`,
    '--portal-h': `${(bounds.height / PORTAL_STAGE.height) * 100}%`,
  };
}
