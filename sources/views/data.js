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
						{id: "firstname", sort:"server", fillspace: true, header: "First Name"},
						{id: "surname", sort:"server", fillspace: true, header: "Surname"},
						{id: "dateofbirth", format: webix.Date.dateToStr("%d %M %Y"), sort:"date", fillspace: true, header: "Date of Birth"},
						{id: "salary", sort:"server", fillspace: true, header: "Salary", template: (obj) => {
							return obj.salary + " RUB";
						}
						},
					],
					url: "http://localhost:3015/employees",
					save: {
						url: "rest->http://localhost:3015/employees",
						updateFromResponse: true
					},
					datafetch: 25,
					scheme: {
						$init: function (obj) {
							const parser = webix.Date.strToDate("%Y-%m-%d");
							obj.dateofbirth = parser(obj.dateofbirth);
						}
					},
					on: {
						onItemDblClick: (id) => {
							const form = this.FormforEmployees;
							const datatable = this.$getDatatable();
							const values = datatable.getSelectedItem();
							this.form.showWindow(values, function (data) {
								datatable.updateItem(id, data);
								form.hide();
							});
						},
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
								const datatable = this.$getDatatable();
								form.showWindow("", function(data) {
									datatable.add(data);
									form.hide();
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
								const datatable = this.$getDatatable();
								const values = datatable.getSelectedItem();
								form.showWindow(values, function(data) {
									datatable.updateItem(id, data);
									form.hide();
								});
							}
						},
						{
							view: "button",
							localId: "removeButton",
							value: "Remove",
							hotkey: "delete",
							type: "form",
							click: () => {
								let id = this.$getDatatable().getSelectedId(false, true);
								this.$getDatatable().remove(id);
								return false;
							}
						}
					]
				}
			]
		};
	}
	$getDatatable() {
		return this.$$("datatable");
	}
	init() {
		this.FormforEmployees = this.ui(FormforEmployeesView);
	}
}
