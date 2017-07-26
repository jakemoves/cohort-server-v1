# cohort-server

SETUP:
- create a new branch off of `fluxdelux` (TODO: merge `fluxdelux` and `pillar` and other project branches into master)
- spin up a heroku server using that branch
- in the Cohort app you're using as a client: 
    + set _cohortServerURL to your heroku app's domain (i.e. http://cohortserver-PROJECT.herokuapp.com)
    + in Target > Info > Custom iOS Target Properties, add or edit App Transport Security Settings:    
        - add the same domain to the Exception Domain list
        - set NSTemporaryExceptionAllowsInsecureHTTPLoads to YES
        - set NSIncludesSubdomains to YES
        