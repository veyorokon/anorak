import styled from 'styled-components';

export const FullContainer = styled.div`
  /* height: -webkit-fill-available; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const CtaMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
`;

export const FlexRow = styled(CtaMain)`
  width: 90%;
  justify-content: flex-start;
  align-items: center;
`;

export const CtaLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

export const CtaRight = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

export const Diamond = styled.div`
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-right: 800px solid #4ffcff;
  border-bottom: 500px solid transparent;
  z-index: -1;
  opacity: 0.6;
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

export const Image = styled.img`
  width: 100px;
  padding-right: 15px;
`;

export const MidFoldContainer = styled.div`
  border: 2px solid mistyrose;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PText = styled.p`
  font-size: 1rem;
  color: #828282;
  width: 60%;
`;

export const FlexRowSpaced = styled(FlexRowDiv)`
  justify-content: space-between;
  width: 70%;
  margin-top: 45px;
`;
