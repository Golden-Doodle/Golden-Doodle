import requests
import json

def fetch_bus_locations():
  try:
    print("🚀 Fetching session cookies...")
    response = requests.get("https://shuttle.concordia.ca/concordiabusmap/Map.aspx", headers={"Host": "shuttle.concordia.ca", "User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
      raise Exception("❌ Failed to fetch session cookies")
    print("📄 Raw Session Cookies Response:", response.headers)
    session_cookies = response.headers.get("set-cookie")
    print("✅ Session cookies received:", session_cookies)
    if not session_cookies:
      raise Exception("❌ No session cookies found")
    print("🚀 Fetching Concordia bus locations...")
    bus_response = requests.post("https://shuttle.concordia.ca/concordiabusmap/WebService/GService.asmx/GetGoogleObject", headers={"Host": "shuttle.concordia.ca", "User-Agent": "Mozilla/5.0", "Content-Type": "application/json; charset=UTF-8", "Content-Length": "0", "Cookie": session_cookies}, json={})
    if bus_response.status_code != 200:
      raise Exception("❌ Failed to fetch bus data")
    bus_data_text = bus_response.text
    print("📄 Raw Bus Data Response:", bus_data_text)
    bus_data = json.loads(bus_data_text)
    print("✅ Parsed Bus Data:", bus_data)
    return bus_data
  except Exception as error:
    print("⚠️ Error fetching Concordia shuttle bus locations:", error)
    return None
  
fetch_bus_locations()