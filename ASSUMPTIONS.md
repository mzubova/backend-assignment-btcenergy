# Assumptions and reasoning

## 
Here I've put some of the assumptions/questions to discuss with the team based on tech assignment and tasks

**Provide the total energy consumption per day in the last x number of days**:
    - Argument `lastNumberOfDays` is limited to `3` in GQL request.
    Information of blocks in a day: (https://blockchain.info/blocks/$time_in_milliseconds?format=json) doesn't return block size/transactions, therefore we need to make an additional request for every block in that day in order to fetch block info. That is a lot of requests. Shall we support it? If we don't want to limit it, then the very first call can take a lot of time and even timeout. 
    - Calculation is based on block size property and not on block transactions
    - Not covered: rate limits, request fails, retries, sending requests in bacthes if needed
    
**Advanced Feature: Optimize the number of calls made to the Blockchain API to avoid asking for the same information multiple times**:
    - Caching for `total energy consumption per day` task should be improved, current implementation was to do my best in the limited ammount of time :) 
    Now while fetching info from blockchain api, data provider will first check cache and do a request only if there's no data found. I decided to cache the final result for that query as well in order not to recalculate consumption data even from cache. But this "quick cache" doesn't take into account that in today's day there can be new blocks and assumes that data in the past is immutable. 
    - Cache ttl should be discussed
    - The very first request will be taking long time. Having a "warm up" lambda/service which will fetch the cache data and do calculations would be benefitial.

 **Tests**:
    - No time to properly mock redis in given time, so it's working but there are errors in console.
    - I avoided making integration test for `total energy consumption per day` as in long term in pipeline this can dramatically decrease its' speed, it's better to mock responses and do a unit test with mocked data (not done)

**GQL**:
    - Introduce schemas. Now it's a generic JSON object so we can't query on specific properties

**General**:
    - What should API return if request to blockchain API fails? partially fails?
    - Shall the consumption response be rounded? What accuracy should we provide? 
    - Introduce logging(INFO,DEBUG,ERR)/generic error handling throughout the project
    - `src/config.ts` for now contains simple hardcoded values, preferebly use `convictJS` or similar for a better configuration schema.
