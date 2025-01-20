  const App = {
  loading: false,
  contracts: {},

 load: async () => {
    try {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    } catch (error) {
      console.error("Error in load:", error)
    }
  },
// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
loadWeb3: async function() {
						   
    if (typeof window.ethereum !== 'undefined') {
      // Modern dapp browsers
      App.web3Provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        window.web3 = new Web3(window.ethereum)
      } catch (error) {
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers
    else if (typeof window.web3 !== 'undefined') {
      App.web3Provider = window.web3.currentProvider
      window.web3 = new Web3(window.web3.currentProvider)
    }
    // Non-dapp browsers
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
				 
    }
  },

  loadAccount: async function() {
    // Get accounts
    const accounts = await window.web3.eth.getAccounts()
    App.account = accounts[0]
    // You might want to show this in your UI
    console.log(App.account)
  },

   loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)
  	console.log(todoList)

    //hydrate the smart contract with values from blockchain
    App.todoList = await App.contracts.TodoList.deployed()
  },

   render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },
  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

    createTask: async () => {
      try {
    // Show loading state
    App.setLoading(true)
    const content = $('#newTask').val()

     // Ensure we have the current account
     if (!App.account) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        App.account = accounts[0]
      }

      // Create task using the current account
      await App.todoList.createTask(content, {
        from: App.account
      })
    // Reset form and refresh display
      $('#newTask').val('')
      await App.render()
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      App.setLoading(false)
    }
  },
    toggleCompleted: async (e) => {
      try{
    App.setLoading(true)
    const taskId = e.target.name
    if (!App.account) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        App.account = accounts[0]
      }
    await App.todoList.toggleCompleted(taskId, {
        from: App.account
      })
        $('#newTask').val('')
      await App.render()
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      App.setLoading(false)
    }
  },

    setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
