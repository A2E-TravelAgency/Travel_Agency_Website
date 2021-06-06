from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions
from bs4 import BeautifulSoup
from time import sleep
import sys
import re
import pandas as pd
import numpy as np
import json


from datetime import date, timedelta, datetime
import time
    
origin = "RAK"
destination = "TUN"
startdate = "2021-09-06"
enddate = "2021-09-09"

url = "https://web.atlasvoyages.com/reservation-vols#/?flight=" + origin + "," + destination + "," + startdate + "&travellers=1&cabin=M"
url1 = "https://www.kayak.com/flights/" + origin + "-" + destination + "/" + startdate + "/" + enddate + "?sort=bestflight_a&fs=stops=0"

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome("C:/Users/S/Desktop/travel_agency/Python/chromedriver.exe", options=chrome_options)
driver.implicitly_wait(20)
driver.get(url)



soup=BeautifulSoup(driver.page_source, 'lxml')
#print(soup.prettify())
    
    #get the arrival and departure times
deptimes = soup.find_all('div', attrs={'class': 'ng-binding','ng-class':"{highlight:filterQuery.highlight==='departure'}",'ng-bind':"i.departure.date | date:'HH:mm'"})

arrtimes = soup.find_all('div', attrs={'class': 'ng-binding','ng-class':"{highlight:filterQuery.highlight==='arrival'}",'ng-bind':"i.arrival.date | date:'HH:mm'"})
#meridies = soup.find_all('span', attrs={'class': 'time-meridiem meridiem'})
    
deptime = []
for div in deptimes:
    deptime.append(div.getText())  
        
arrtime = []
for div in arrtimes:
    arrtime.append(div.getText())   

        
deptime = np.asarray(deptime)
    #deptime = deptime.reshape(int(len(deptime)/2), 2)
    
arrtime = np.asarray(arrtime)
    #arrtime = arrtime.reshape(int(len(arrtime)/2), 2)      
            
    #Get the price
regex = re.compile('Common-Booking-MultiBookProvider (.*)multi-row Theme-featured-large(.*)')
price_list = soup.find_all('div', attrs={'class': regex})
    
price = []
for div in price_list:
    price.append(int(div.getText().split('\n')[3][1:-1]))

df = pd.DataFrame({"origin" : origin,
                       "destination" : destination,
                       "startdate" : startdate,
                       "enddate" : enddate,
                       "currency": "USD",
                       "deptime":deptime,
                       "arrtime": arrtime,
                       
                       })

print(df)

resp = df.to_json(orient = "records")


print(json.dumps(resp))
sleep(10)
driver.quit()
sys.stdout.flush()
    