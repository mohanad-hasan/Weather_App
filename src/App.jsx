import './App.css';

// REACT
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//IMPORT MATERIAL UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

//EXTERNAL LIBRARIES  
import moment from 'moment/min/moment-with-locales';

//IMPORT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './features/weatherApi/weatherApiSlice';

moment.locale('ar');

const theme = createTheme({
  typography: {
    fontFamily: '"IBM", "Segoe UI", sans-serif',
  },
});

function App() {
  const dispatch = useDispatch();
  const { data: weatherData, status, error } = useSelector((state) => state.weather);
  const [dateAndTime, setDateAndTime] = useState("");
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState('ar');

  const direction = local === 'ar' ? 'rtl' : 'ltr';

  function handleTranslationClicked() {
    if(local == 'ar') {
      i18n.changeLanguage('en');
      setLocal('en');
    }else {
      i18n.changeLanguage('ar');
      setLocal('ar');
    }
  }

  useEffect(() => {
    i18n.changeLanguage('ar');
  },[]);

  useEffect(() => {
    const updateDateAndTime = () => {
      const separator = local === 'ar' ? '،' : ',';
      setDateAndTime(moment().locale(local).format(`dddd${separator} D MMMM YYYY - h:mm:ss A`));
    };

    updateDateAndTime();
    const interval = setInterval(() => {
      updateDateAndTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [local]);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {/* START BUILDING YOUR WEATHER APP HERE */}
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {/* START CONTENT CONTAINER */}
            <div style={{width:'100%',color:'white'}} dir={direction}>
              {/* START CARD */}
                <div style={{
                  background: 'linear-gradient(45deg, #000000, #00695c)',
                  padding: '20px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }} dir={direction}>
                    {/* START CITY AND DATE */}
                      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end' }}>
                        <h1 style={{ margin:'0 10px' }}>{t('latakia')}</h1>
                        <p style={{ fontSize:'20px',fontWeight:'bold' }}>{dateAndTime}</p>
                      </div>
                    {/* END CITY AND DATE */}
                  <hr style={{ border: '1px solid #009688', width: '100%', margin: '20px 0' }} />
                    {/* START WEATHER INFO */}
                      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                        {/* START WEATHER DEGRE AND DESCRIPTION */}
                          <div style={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',marginRight:'10px'}}>
                            {status === 'loading' ? (
                              <CircularProgress enableTrackSlot size="3rem" aria-label="Loading…" style={{color:'white'}}/>
                            ) : status === 'failed' ? (
                              <p>{t('error')}: {error}</p>
                            ) : (
                            <>
                              <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <h3 style={{fontSize:'80px'}}>{weatherData.temperature !== null ? weatherData.temperature : '28'}</h3>
                                {weatherData.temperatureIcon && (
                                  <img src={weatherData.temperatureIcon} alt="Weather Icon" style={{width:'100px',height:'100px'}} />
                                )}
                              </div>
                              <p>{t(weatherData.description)}</p>
                              <div style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'start',marginTop:'10px'}}>
                                <p>{t('min')} : {weatherData.minTemp !== null ? weatherData.minTemp : '28'}</p>
                                <span style={{margin:'0 10px'}}>|</span>
                                <p>{t('max')} : {weatherData.maxTemp !== null ? weatherData.maxTemp : '28'}</p>
                              </div>
                            </>)}
                          </div>
                        {/* END WEATHER DEGRE AND DESCRIPTION */}
                        {/* START WEATHER ICON */}
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <CloudIcon style={{fontSize:'200px'}} />
                          </div>
                        {/* END WEATHER ICON */}
                      </div>
                    {/* END WEATHER INFO */}
                </div>
              {/* END CARD */}
                
              {/* START TRANSLATION BUTTON */}
                <div style={{display:'flex',justifyContent:'end',alignItems:'center',marginTop:'20px'}} dir={direction}>
                  <Button variant="contained" style={{ backgroundColor: '#009688', color: 'white', borderRadius: '10px', padding: '10px 20px', fontSize: '16px',boxShadow: '0 4px 8px 12px rgba(0, 0, 0, 0.2)'}} onClick={handleTranslationClicked}>
                    {local == 'ar' ? 'إنجليزي' : 'Arabic'}
                  </Button>
                </div>
              {/* END TRANSLATION BUTTON */}
            </div>
          {/* END CONTENT CONTAINER */}
        </Container>
      {/* END BUILDING YOUR WEATHER APP HERE */}
    </ThemeProvider>
  )
}

export default App
