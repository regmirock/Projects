#include<stdio.h>

int main() {
    int n, contextSwitch;
    
    // Get the number of processes from the user
    printf("Enter the number of processes: ");
    scanf("%d", &n);

    // Arrays to store processing time and waiting time for each process
    int burstTime[n], waitingTime[n];

    // Get the processing time for each process
    for (int i = 0; i < n; i++) {
        printf("Enter the processing time for P%d: ", i + 1);
        scanf("%d", &burstTime[i]);
    }

    // Get the context switch time
    printf("Enter the context switch time: ");
    scanf("%d", &contextSwitch);

    // Calculate waiting time for each process
    waitingTime[0] = 0; // Waiting time for the first process is always 0

    for (int i = 1; i < n; i++) {
        waitingTime[i] = waitingTime[i - 1] + burstTime[i - 1] + contextSwitch;
    }

    // Display the table
    printf("\nProcess name\tProcessing time\tWaiting time\n");
    for (int i = 0; i < n; i++) {
        printf("P%d\t\t%d\t\t%d\n", i + 1, burstTime[i], waitingTime[i]);
    }

    // Calculate and display the average waiting time
    int totalWaitingTime = 0;
    for (int i = 0; i < n; i++) {
        totalWaitingTime += waitingTime[i];
    }

    printf("\nAverage waiting time\t%.2f\n", (float)totalWaitingTime / n);

    return 0;
}
