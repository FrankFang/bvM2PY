import styled from 'styled-components'
const Box = styled.div`
  border: 1px solid red;
  height: 100px;
  &:hover{
    background: red;
  }
`
const BlueBox = styled(Box)`
  border-color: blue;
`
export const Welcome2: React.FC = () => {
  return (
    <div>
      <Box>
        hi
      </Box>
      <BlueBox>
        hi
      </BlueBox>
    </div>
  )
}
