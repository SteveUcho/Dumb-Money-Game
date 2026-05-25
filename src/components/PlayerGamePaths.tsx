import { useAtomValue } from "jotai";
import { motion } from "motion/react";
import { playerSelectedAtom } from "@/utils/atoms";

interface PlayerGamePathsProps {
  playerLinePaths: string[];
  playersDataPoints: { player: string; color: string }[];
}

export function PlayerGamePaths(props: PlayerGamePathsProps) {
  const { playerLinePaths, playersDataPoints } = props;
  const selectedPlayer = useAtomValue(playerSelectedAtom);

  return (
    <>
      {playerLinePaths.map((path, index) => (
        <motion.path
          key={playersDataPoints[index].player}
          d={path}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          strokeOpacity={1}
          strokeWidth={2}
          stroke={playersDataPoints[index].color}
          opacity={selectedPlayer === index ? 1 : 0.3}
          fill="transparent"
          initial={{ pathLength: 0 }}
        />
      ))}
    </>
  );
}
