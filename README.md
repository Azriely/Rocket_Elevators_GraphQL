# Rocket_Elevators_GraphQL

Implemented using Node.js and Express to deploy this GraphQL API on Heroku. Here is the website https://rocket-elevators-graph.herokuapp.com/graphql

GraphQL API Team:
Matthew Dandurand
Do Minh An Nguyen
Jacob Gomez

Question 1:
Retrieving the address of the building, the beginning and the end of the intervention for a specific intervention.
Query 1:

```
{
 pending_interventions {
 	id
	status
	start_date
	end_date
 }
}
```

Question 2:
Retrieving customer information and the list of interventions that took place for a specific building
Query 2:

```
mutation {	
	 update_intervention_start_date(id: 7) {
		id
		status
		start_date
		end_date
	 }
}
```

Question 3:
Retrieval of all interventions carried out by a specified employee with the buildings associated with these interventions including the details (Table BuildingDetails) associated with these buildings.
Query 3:

```
mutation {	
	 update_intervention_end_date(id: 7) {
		id
		status
		start_date
		end_date
	 }
}
```
