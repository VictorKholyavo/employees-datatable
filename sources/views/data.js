import { JetView } from "webix-jet";
import FormforEmployeesView from "./form";

export default class DataView extends JetView {
	config() {
		return { 
			rows: [
				{
					view: "datatable",
					localId: "datatable", 
					margin: 20,
					select: true,
					columns: [
						{id: "firstname", fillspace: true, header: "First Name"},
						{id: "surname", fillspace: true, header: "Surname"},
						{id: "dateofbirth", fillspace: true, header: "Date of Birth"},
						{id: "salary", fillspace: true, header: "Salary"},
					],
					url: "http://localhost:3015/employees",
					save: {
						url: "rest->http://localhost:3015/employees",
						updateFromResponse: true
					},
					on:{
						onAfterSelect: (id) => {
							this.setParam("id", id, true);
						}
					},

					css: "webix_shadow_medium" 
				},
				{
					cols: [
						{
							view: "button",
							localId: "addButton",
							value: "Add",
							type: "form",
							click: () => {
								const form = this.FormforEmployees;
								const datatable = this.$$("datatable");
								this.FormforEmployees.showWindow("", function(data) {
									datatable.updateItem(1, data)
									form.hide()
								});
							}
						},
						{
							view: "button",
							localId: "editButton",
							value: "Edit",
							type: "form",
							click: () => {
								const form = this.FormforEmployees;
								const datatable = this.$$("datatable");
								const id = this.getParam("id", true);
								const values = datatable.getItem(id);
								this.FormforEmployees.showWindow(values, function(data) {
									datatable.updateItem(1, data);
									form.hide();
								});
							}
						},
						{
							view: "button",
							localId: "removeButton",
							value: "Remove",
							type: "form"
						}
					]
				}
			]
		};
	}
	init() {
		this.FormforEmployees = this.ui(FormforEmployeesView);
		// this.$$("datatable").parse(data);
	}
}