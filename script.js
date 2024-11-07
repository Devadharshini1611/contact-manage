// script.js

// Load contacts from localStorage
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactsTable = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
    contactsTable.innerHTML = '';

    contacts.forEach((contact, index) => {
        const row = contactsTable.insertRow();
        row.insertCell(0).textContent = contact.name;
        row.insertCell(1).textContent = contact.phone;
        row.insertCell(2).textContent = contact.email;
        
        // Edit Button
        const editCell = row.insertCell(3);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.onclick = () => editContact(index);
        editCell.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteContact(index);
        editCell.appendChild(deleteButton);
    });
}

// Add a new contact
function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && phone && email) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, phone, email });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } else {
        alert('Please fill all fields');
    }
}

// Edit an existing contact
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;

    // Change the "Add" button to "Save"
    const addButton = document.getElementById('addContact');
    addButton.textContent = 'Save Changes';
    addButton.onclick = () => saveChanges(index);
}

// Save changes after editing
function saveChanges(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && phone && email) {
        contacts[index] = { name, phone, email };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();

        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        const addButton = document.getElementById('addContact');
        addButton.textContent = 'Add Contact';
        addButton.onclick = addContact;
    } else {
        alert('Please fill all fields');
    }
}

// Delete a contact
function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}

// Initialize the app
document.getElementById('addContact').addEventListener('click', addContact);
loadContacts();
