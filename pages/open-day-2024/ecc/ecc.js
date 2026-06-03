/* Get size from URL Search Params */

let params = new URLSearchParams(document.location.search);
const size = params.get("size") || 5;

let bit_matrix = [];
let data_set = false, bit_flipped = false;

for (let i = 0; i <= size; i++) {
    let bit_row = [];

    for (let j = 0; j <= size; j++) {
        bit_row.push(0);
    }
    bit_matrix.push(bit_row);
}

// Initialize HTML table elements for the bit_matrix
let bit_table = document.getElementById("bit-table");

for (let i = 0; i <= size; i++) {
    let table_row = document.createElement("tr");
    table_row.id = `r${i}`;

    for (let j = 0; j <= size; j++) {
        let table_cell = document.createElement("td");
        table_cell.id = `c${i}-${j}`;
        table_cell.classList.add("bit");

        // Parity Bit
        if ((i == size) || (j == size)) {
            table_cell.classList.add("invisible");
        }

        table_cell.addEventListener("click", e => {
            if (data_set) {
                if (bit_flipped) {
                    alert("Only 1 flip allowed!")
                    return;
                } else {
                    bit_flipped = true;
                }
            }

            let y = e.target.id[1];
            let x = e.target.id[3];

            bit_matrix[y][x] = bit_matrix[y][x] ? 0 : 1;
            e.target.classList.toggle("on");
        });

        table_row.appendChild(table_cell);
    }

    bit_table.appendChild(table_row);
}

// Initialize Button Functions
let set_data_button = document.getElementById("set-data");
set_data_button.addEventListener("click", set_data);

let reset_button = document.getElementById("reset");
reset_button.addEventListener("click", () => window.location.reload());

function set_data() {
    // Generate row-wise parity data
    for (let i = 0; i <= size - 1; i++) {
        let bit_row = bit_matrix[i];
        let row_sum = bit_row.slice(0, size).reduce((s, c) => s += c, 0);
        let is_odd = Boolean(row_sum % 2);

        let parity_cell = document.getElementById(`c${i}-${size}`);
        parity_cell.classList.remove("invisible");

        if (is_odd) {
            bit_row[size] = 1;
            parity_cell.classList.add("on");
        }
    }

    // Generate column-wise parity data
    for (let j = 0; j <= size - 1; j++) {
        let column_sum = 0;
        for (let i = 0; i <= size - 1; i++) {
            column_sum += bit_matrix[i][j];
        }

        let is_odd = Boolean(column_sum % 2);
        let parity_cell = document.getElementById(`c${size}-${j}`);
        parity_cell.classList.remove("invisible");

        if (is_odd) {
            bit_matrix[size][j] = 1;
            parity_cell.classList.add("on");
        }
    }
    
    // Generate parity corner
    let row_sum = bit_matrix[size].slice(0, size).reduce((s, c) => s += c, 0);
    let is_odd = Boolean(row_sum % 2);

    let parity_cell = document.getElementById(`c${size}-${size}`);
    parity_cell.classList.remove("invisible");

    if (is_odd) {
        bit_matrix[size][size] = 1;
        parity_cell.classList.add("on");
    }

    data_set = true;
}