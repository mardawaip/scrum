import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import withRouter from '@fuse/core/withRouter';
import reducer from '../store';
import { styled } from '@mui/material/styles';
import { getDetailAplikasi } from "../store/aplikasi";
import withReducer from "app/store/withReducer";
import AplikasiHeader from './aplikasiHeader';
import { getBoard } from "../store/boardSlice";
import BoardSettingsSidebar from "../board/sidebars/settings/BoardSettingsSidebar";

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
      backgroundColor: theme.palette.background.paper,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
}));

function Aplikasi() {
    const routeParams = useParams();
    const dispatch = useDispatch();
    const { aplikasi_detail } = useSelector(({ ScrumAplikasi }) => ScrumAplikasi.aplikasi);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(getBoard(routeParams.boardId));
        dispatch(getDetailAplikasi({ id: routeParams.boardId }));
    }, [dispatch]);
    
    return (
        <Root
            header={<AplikasiHeader onSetSidebarOpen={setSidebarOpen} boardId={routeParams.boardId} />}
            content={
                <div className="p-24">
                    
                </div>
            }
            scroll="content"
        />
    )
}

// export default Aplikasi;
export default withReducer('ScrumAplikasi', reducer)(withRouter(Aplikasi));