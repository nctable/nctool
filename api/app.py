from flask import Flask,render_template, url_for
app= Flask(__name__)

import requests
def tokenPrice(token):
    # Example API endpoint URL
    url = f'https://api.wemixplay.com/info/v1/coin-detail?symbol={token}'
    # Make a GET request to the API
    response = requests.get(url)
    data = response.json()
    return data['data']['priceData']['price']


def tokenPriceLister():
    token_list=['PROMOTE','TEAR','FEATHER','MORION','PAPYRUS','GEAR']
    price_list=[]
    for item in token_list:
        price = tokenPrice(item)
        token = item
        price_list.append((token,price))
    return price_list

def crowPrice():
    return tokenPrice('CROW')


@app.route('/')
def index():
    price_list = tokenPriceLister()
    crow_value = crowPrice()

    return render_template('test.html', price_list=price_list, crow_value = crow_value)  

@app.route('/test')
def test():
    price_list = tokenPriceLister()
    crow_value = crowPrice()

    return render_template('test.html', price_list=price_list, crow_value = crow_value) 
if __name__== "__main__":
    app.run(debug=True)