import styled from 'styled-components'

const BaseButton = styled.button`
  background: none;
  border-radius: 0.25rem;
  border: none;
  color: #343a40; // gray100 for light theme
  font-size: 0.875rem; // 16
  font-weight: 500;
  padding: 0.5rem 0.875rem;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`

export const ButtonPrimary = styled(BaseButton)`
  background-color: #eee2fc; // voilet30 for light theme?
  border: 0.09375rem solid #8933eb; // voilet70 for light theme?

  &:focus {
    box-shadow: 0 0 0 2px #eee2fc, 0 0 0 4px #5711a7; //voilet 90
  }
`

export const ButtonSecondary = styled(BaseButton)`
  background-color: #ffffff; // white for light theme?
  border: 0.09375rem solid #ced4da; // gray30 for light theme?

  &:focus {
    box-shadow: 0 0 0 2px #eee2fc, 0 0 0 4px #5711a7; //voilet 90
  }
`

export const ButtonMinimal = styled(BaseButton)`
  &:focus {
    background-color: #eee2fc; // voilet30 for light theme?
  }
`
