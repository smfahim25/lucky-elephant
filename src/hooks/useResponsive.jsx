import { useMediaQuery } from 'usehooks-ts'

export default function useResponsive() {
  const md = useMediaQuery('(min-width: 868px)')

  return { md }
}
