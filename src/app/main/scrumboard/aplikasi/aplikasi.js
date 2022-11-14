import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import withRouter from '@fuse/core/withRouter';
import reducer from '../store';
import { styled } from '@mui/material/styles';
import { getDetailAplikasi } from "../store/dataSlice";
import withReducer from "app/store/withReducer";
import AplikasiHeader from './aplikasiHeader';
import { getBoard } from "../store/dataSlice";
import BoardHeader from "../board/BoardHeader";
import BoardSettingsSidebar from "../board/sidebars/settings/BoardSettingsSidebar";
import { Button, Card, CardContent, Grid, LinearProgress, Paper } from "@mui/material";
import RadialBar from "./radialBar";
import ListWiddget from "./ListWiddget";
import ListHeader from "./ListHeader";
import TaskDialog from "./taskDialog";

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
      backgroundColor: theme.palette.background.paper,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': {
        maxWidth: '100%'
    },
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
}));

function Aplikasi() {
    const routeParams = useParams();
    const dispatch = useDispatch();
    const { board, loading } = useSelector(({ scrumboardApp }) => scrumboardApp.data);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(getBoard(routeParams.boardId));
        dispatch(getDetailAplikasi({ id: routeParams.boardId }));
    }, [dispatch]);

    if (!board) {
        return null;
    }
    
    return (
        <Root
            header={
                <>
                { loading && <LinearProgress/> }
                <BoardHeader onSetSidebarOpen={setSidebarOpen} boardId={routeParams.boardId} />
                </>
            }
            rightSidebarContent={<BoardSettingsSidebar onSetSidebarOpen={setSidebarOpen} />}
            rightSidebarOpen={sidebarOpen}
            content={
                <div className="w-full">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} xl={12}>
                            <ListHeader/>
                        </Grid>
                        <Grid item xs={12} sm={8} xl={10}>
                            <Card>
                                <CardContent>
                                    <ListWiddget/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} xl={2}>
                            <Card>
                                <CardContent>
                                    <RadialBar/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <TaskDialog/>
                </div>
            }
            scroll="content"
        />
    )
}

export default Aplikasi;
// export default withReducer('scrumboardApp', reducer)(withRouter(Aplikasi));