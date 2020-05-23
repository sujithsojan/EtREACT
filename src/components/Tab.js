import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import './Style.css';
import TotalBarmn from './TotalBarmn';
import LineChartmn from './LineChartmn';
import CategoryBarmn from './CategoryBarmn';
import * as API from '../constants/Api';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#A4A1FB',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: '#ffffff'
    },
    '&:focus': {
      color: '#A4A1FB',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding:0
    // padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Month" {...a11yProps(0)}/>
          <AntTab label="Year" {...a11yProps(1)}/>
          
        </AntTabs>
        <Typography className={classes.padding} />
        <SwipeableViews  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>

        <TabPanel  value={value} index={0} dir={theme.direction} >
        
          <div id="cbar">
        < TotalBarmn  message = {props.message} api ={API.BAR_MONTH}/>
        </div>
        <div id="cline">
        <LineChartmn  message = {props.message}  api = {API.LINE_MONTH}/>
        </div>
        <CategoryBarmn  message = {props.message} api ={API.CAT_BAR_MONTH}/>
      </TabPanel>

        <TabPanel  value={value} index={1} dir={theme.direction} >
        <div id="cbar">
        < TotalBarmn  message = {props.message} api ={API.BAR_YEAR}/>
        </div>
        <div id="cline">
        <LineChartmn  message = {props.message} api = {API.LINE_YEAR}/>
        </div>
        <CategoryBarmn  message = {props.message} api ={API.CAT_BAR_YEAR}/>
        </TabPanel>
        
      </SwipeableViews>
      </div>

    </div>
  );
}