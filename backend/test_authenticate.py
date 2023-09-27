import unittest
from app import app, db
import json

class TestAuthenticate(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        

    def test_delivery_route_addition(self):
        login_response = self.app.post('/login', json={'username': 'admin', 'password': '*******'})    # enter correct password

        response = self.app.post('/routes', json={'fromL': 'NewYork', 'toL': 'LosAngeles'})
        self.assertEqual(response.status_code, 200) 

    def test_invalid_input(self):
        payload = {'fromL': 'New York', 'toL': 'Washington'}
        response = self.app.post('/routes', data=json.dumps(payload))
        self.assertEqual(response.status_code, 401)

    def tearDown(self):
        db['routes'].delete_many({'fromL': 'NewYork'})

if __name__ == '__main__':
    unittest.main()