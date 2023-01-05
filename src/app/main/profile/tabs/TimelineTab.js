import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TimelineTab() {
  const [data, setData] = useState(null);
  const { profil_log } = useSelector(({ dataProfil }) => dataProfil.data);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col w-full md:w-320 md:ltr:mr-32 md:rtl:ml-32">
          <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24">
            <div className="flex justify-between items-center pb-16">
              <Typography className="text-2xl font-semibold leading-tight">
                Latest Activity
              </Typography>
              <Button color="inherit" size="small" className="font-medium -mx-8">
                See All
              </Button>
            </div>

            <CardContent className="p-0">
              { profil_log.length === 0 && <Typography variant="caption">Belum Ada Aktifitas</Typography> }
              <List className="p-0">
                {profil_log.map((activity) => (
                  <ListItem key={activity.id} className="px-0 space-x-12">
                    <Avatar className="" alt={activity.user.name} src={activity.user.avatar} />
                    <ListItemText
                      className="flex-1"
                      primary={
                        <div className="flex">
                          <Typography
                            className="font-normal whitespace-nowrap"
                            color="secondary"
                            paragraph={false}
                          >
                            {activity.user.name}
                          </Typography>

                          <Typography className="px-4 truncate" paragraph={false}>
                            {activity.message}
                          </Typography>
                        </div>
                      }
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col flex-1">
          konten
        </div>
      </div>
    </motion.div>
  );
}

export default TimelineTab;
