import styled from 'styled-components';

export const FullContainer = styled.div`
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`;

export const CtaMain = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CtaLeft = styled.div`
  border: 1px solid red;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 60px;
`;

export const CtaRight = styled.div`
  border: 1px solid green;
  width: 50%;
  margin-right: 60px;
`;

export const H1 = styled.h1`
  font-family: 'HurmeGeometricSans1-Regular', 'Helvetica', sans-serif;
  font-size: 2.4rem;
  margin-bottom: 50px;
`;

export const SubHeader = styled.p`
  font-family: 'HurmeGeometricSans1-Regular', 'Helvetica', sans-serif;
  font-size: 0.6rem;
  font-weight: bold;
  color: #828282;
  margin-top: 50px;
`;
