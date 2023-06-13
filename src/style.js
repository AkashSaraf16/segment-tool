import styled from 'styled-components';

const WrapperDiv = styled.div`
	height:680px;
    width: 580px;
    display: flex;
    flex-direction: column;
`;

const EditPanelGrid = styled.div`
	margin:3px;
    display: flex;
    flex-wrap:wrap;
`;

const Panel = styled.div`
	height:1.5rem;
	width:3rem;
	background-color:green;
	margin:1rem 1rem 0rem 0rem;
	font-size: 16px;
	font-weight: bold;
	text-align:center;
`;

export {
	WrapperDiv,
	EditPanelGrid,
	Panel
};