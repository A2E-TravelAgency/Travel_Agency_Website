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
    
origin = sys.argv[1]#"RAK"
destination = sys.argv[2]#"TUN"
startdate = sys.argv[3]#"2021-09-06"
nbr = sys.argv[4]
clas = sys.argv[5]
#enddate = "2021-09-09"
#url2 = "https://web.atlasvoyages.com/reservation-vols#/?flight=RAK,TUN,2021-12-11&travellers=1&cabin=M"
url = "https://web.atlasvoyages.com/reservation-vols#/?flight=" + origin + "," + destination + "," + startdate + "&travellers=" + nbr + "&cabin=" + clas + ""
#url1 = "https://www.kayak.com/flights/" + origin + "-" + destination + "/" + startdate + "/" + enddate + "?sort=bestflight_a&fs=stops=0"

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome("C:/Users/S/Desktop/travel_agency/back_end/Python/chromedriver.exe", options=chrome_options)
driver.set_window_size(5, 5) 
driver.implicitly_wait(20)
driver.get(url)



soup=BeautifulSoup(driver.page_source, 'lxml')
#print(soup.prettify())
company = soup.find_all('div', attrs={'ng-repeat':"f in i.flights | limitTo : 1",'class':"row ng-scope"})
    #get the arrival and departure times
deptimes = soup.find_all('div', attrs={'class': 'ng-binding','ng-class':"{highlight:filterQuery.highlight==='departure'}",'ng-bind':"i.departure.date | date:'HH:mm'",'data-placement':"bottom",'data-toggle':"tooltip"})

arrtimes = soup.find_all('div', attrs={'class': 'ng-binding','ng-class':"{highlight:filterQuery.highlight==='arrival'}",'ng-bind':"i.arrival.date | date:'HH:mm'",'data-placement':"bottom",'data-toggle':"tooltip"})
#meridies = soup.find_all('span', attrs={'class': 'time-meridiem meridiem'})
prices= soup.find_all('strong')
#pricess = prices[2]
prc = []
rows = soup.findAll('tr', attrs={'ng-repeat-start':'i in itineraries','class':'tRmob ng-scope'})
for row in rows:
        col1 = row.find_all('td')[2]            
        for td in col1:
            prc.append(td.getText())

#for td in soup.findAll('td'):
#        print(td.find('strong'))
plane = []
for div in company:
    pln = div.find_all('div')           
    for dv in pln:
        plane.append(dv.getText())

compagnie = []
for div in company:
    comp = div.find_all('strong')           
    for strong in comp:
        compagnie.append(strong.getText())



deptime = []
for div in deptimes:
    deptime.append(div.getText())  
print(int((len(deptime))/2))

arrtime = []
for div in arrtimes:
    arrtime.append(div.getText())   

half = int((len(deptime)/2))
end = int((len(deptime)))
for i in range(half , end):
    deptime.pop(half)
    arrtime.pop(half)
    compagnie.pop(half)
    plane.pop(half)



deptime = np.asarray(deptime)
    #deptime = deptime.reshape(int(len(deptime)/2), 2)
    
arrtime = np.asarray(arrtime)
    #arrtime = arrtime.reshape(int(len(arrtime)/2), 2)      
pricef = np.asarray(prc)   

compagnie = np.asarray(compagnie)

plane = np.asarray(plane)
    #Get the price
regex = re.compile('Common-Booking-MultiBookProvider (.*)multi-row Theme-featured-large(.*)')
price_list = soup.find_all('div', attrs={'class': regex})
    
pricee = []
for div in price_list:
    pricee.append(int(div.getText().split('\n')[3][1:-1]))
pricef = pricef[pricef != 'Aller-Retour']
pricef = pricef[pricef != 'une place disponible']
for i in range(1, 11):
    pricef = pricef[pricef != ''+str(i)+' places disponibles']
    
df = pd.DataFrame({"origin" : origin,
                       "destination" : destination,
                       "startdate" : startdate,
                        "compagnie":compagnie,
                        "plane":plane,
                        "price": pricef,
                        "deptime":deptime,
                        "arrtime": arrtime,
                        "url": url,
                       
                       })
df['id'] = df.origin.map(hash)
print(df)

resp = json.loads(df.to_json(orient = "records"))
resp = {'tickets': resp}

print(json.dumps(resp))
sleep(10)
driver.quit()
sys.stdout.flush()
    