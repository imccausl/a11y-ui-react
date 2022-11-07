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
`

export const ButtonPrimary = styled(BaseButton)`
  background-color: #eee2fc; // voilet30 for light theme?
  border: 0.125rem solid #8933eb; // voilet70 for light theme?
`
