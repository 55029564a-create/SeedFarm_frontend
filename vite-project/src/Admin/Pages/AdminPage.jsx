import { useState } from 'react';
import styled from 'styled-components';

const Base = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
  border: 1px, solid, black;
`;

const contener = styled.div``;

function AdminPage() {
  return (
    <Base>
      <p>Pc 화면</p>
    </Base>
  );
}

export default AdminPage;
