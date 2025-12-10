declare module "use-sound" {
  import { HowlOptions } from "howler";

  export default function useSound(
    src: string | string[],
    options?: HowlOptions & { [key: string]: any }
  ): [
    (options?: { [key: string]: any }) => void,
    {
      stop: (id?: string) => void;
      pause: (id?: string) => void;
      duration: number | null;
      sound: any;
    }
  ];
}
