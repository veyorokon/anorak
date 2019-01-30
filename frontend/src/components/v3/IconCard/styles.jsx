import styled from 'styled-components';

export const IconCardContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  width: 200px;
  height: 200px;
  font-family: 'HurmeGeometricSans1-Regular', 'Helvetica', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${props => props.bgColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
