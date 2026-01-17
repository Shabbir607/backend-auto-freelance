<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $type;
    public $data;

    /**
     * Create a new notification instance.
     *
     * @param string $type The type of notification (e.g., 'project_created', 'status_updated', 'daily_update')
     * @param mixed $data Related data model (Project or DailyUpdate)
     */
    public function __construct($type, $data)
    {
        $this->type = $type;
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage);

        switch ($this->type) {
            case 'project_created':
                $mail->subject('New Project Created: ' . $this->data->name)
                     ->line('A new project has been created.')
                     ->line('Project Name: ' . $this->data->name)
                     ->action('View Project', url('/app/projects/' . $this->data->id));
                break;

            case 'status_updated':
                $mail->subject('Project Status Updated: ' . $this->data->name)
                     ->line('The status of project "' . $this->data->name . '" has been updated to: ' . ucfirst($this->data->status))
                     ->action('View Project', url('/app/projects/' . $this->data->id));
                break;

            case 'daily_update':
                $project = $this->data->project; // Assuming data is DailyUpdate model
                $mail->subject('Daily Update for ' . $project->name)
                     ->line('A new daily update has been posted.')
                     ->line('Content: ' . \Illuminate\Support\Str::limit($this->data->content, 100))
                     ->action('View Update', url('/app/projects/' . $project->id));
                break;
                
            case 'task_assigned':
                 $project = $this->data->project;
                 $mail->subject('New Task Assigned: ' . $this->data->title)
                      ->line('You have been assigned a new task in project: ' . $project->name)
                      ->line('Task: ' . $this->data->title)
                      ->action('View Task', url('/app/projects/' . $project->id));
                 break;

            default:
                $mail->line('You have a new notification.');
        }

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => $this->type,
            'data_id' => $this->data->id,
            // Add more data as needed for database notifications
        ];
    }
}
