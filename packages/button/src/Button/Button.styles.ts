import styled from 'styled-components'

type BaseButtonProps = {
  'aria-disabled': boolean
}

const BaseButton = styled.button<BaseButtonProps>`
  background: none;
  border-radius: 0.375rem;
  border: none;
  color: ${(props) =>
    props['aria-disabled'] ? '#adb5bd' : '#343a40'}; // gray100 for light theme
  font-size: 0.875rem; // 16
  font-weight: 500;
  padding: 0.5rem 0.875rem;

  &:hover {
    cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : 'pointer')};
  }

  &:focus {
    outline: 0;
  }
`

export const ButtonPrimary = styled(BaseButton)<BaseButtonProps>`
  background-color: ${(props) =>
    props['aria-disabled']
      ? '#f9f5ff'
      : '#eee2fc'}; // voilet40 for light theme?
  border: 0.0625rem solid
    ${(props) => (props['aria-disabled'] ? '#d5b6f8' : '#8933eb')}; // voilet70 for light theme?

  &:focus {
    box-shadow: 0 0 0 2px #eee2fc, 0 0 0 4px #5711a7; //voilet 90
  }
`

export const ButtonSecondary = styled(BaseButton)<BaseButtonProps>`
  background-color: #ffffff; // white for light theme?
  border: 0.0625rem solid
    ${(props) => (props['aria-disabled'] ? '#dee2e6' : '#adb5bd')}; // gray60 for light theme?

  &:focus {
    box-shadow: 0 0 0 2px #eee2fc, 0 0 0 4px #5711a7; //voilet 90
  }
`

export const ButtonMinimal = styled(BaseButton)`
  &:focus {
    background-color: #eee2fc; // voilet30 for light theme?
  }
`
