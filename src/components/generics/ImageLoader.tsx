import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '@/style/variables'

interface ImageLoaderProps {
  src: string
  alt: string
}

// This component allow to have a transition state between to images beeing shown
// In the game, it avoid to have the image of a previous actor/movie with the next name
export const ImageLoader = ({ src, alt }: ImageLoaderProps) => {
  const previousSrc = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (previousSrc.current !== src) {
      setLoading(true)
      previousSrc.current = src
    }
  }, [src])

  return (
    <Container>
      <StyledImg src={src} alt={alt} onLoad={() => setLoading(false)} />
      <LoaderOverlay $loading={loading} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 185px;
`

const StyledImg = styled.img`
  width: 100%;
  border-radius: 16px;
`

const LoaderOverlay = styled.div<{ $loading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 8px);
  width: 100%;
  background-color: ${colors.background};
  border-radius: 16px;
  opacity: ${(props) => (props.$loading ? 1 : 0)};
  box-sizing: border-box;

  transition: opacity 0.3s ease-in-out;
`
