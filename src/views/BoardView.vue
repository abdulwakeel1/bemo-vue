<template>
    <div class="custom-container">
        <button @click="addColumn">Add Column</button>
        <column
            v-for="(column, index) in columns"
            :key="index"
            :title="column.title"
            @delete-column="deleteColumn(index)"
        ></column>
    </div>
  </template>

<script>
    import Column from './Column.vue'

    export default {
    components: {
        Column
    },
    data() {
        return {
        columns: [
            { title: 'Column 1' },
            { title: 'Column 2' },
            { title: 'Column 3' },
        ]
        }
    },
    methods: {
        addColumn() {
            this.columns.push({ title: 'Column ' + this.columns.length });
        },
        deleteColumn(index) {
            this.columns.splice(index, 1);
        }
    }
    }
</script>
  
  <style>
    /* Define container class */
    .custom-container {
        display: flex; /* Create a flex container */
        flex-wrap: wrap; /* Allow columns to wrap to the next line */
        justify-content: center; /* Align columns horizontally */
        align-items: flex-start; /* Align columns vertically */
    }
  </style>