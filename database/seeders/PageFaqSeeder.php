<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\Faq;
use Illuminate\Support\Str;

class PageFaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            'Home' => [
                'slug' => 'home', 
                'title' => 'NexusAI - Freelance Automation Hub',
                'faqs' => [
                    ['question' => 'What is NexusAI?', 'answer' => 'NexusAI is a comprehensive platform designed to automate freelance workflows, manage clients, and scale your business using AI.'],
                    ['question' => 'Is it free to start?', 'answer' => 'Yes, you can get started for free. We offer various pricing tiers to suit different needs as your freelance business grows.'],
                    ['question' => 'How does the automation work?', 'answer' => 'We integrate with popular tools and provide pre-built workflows. You can customize these to automate repetitive tasks like invoicing, proposal writing, and lead generation.']
                ]
            ],
            'Workflows' => [
                'slug' => 'workflows',
                'title' => 'Workflow Library',
                'faqs' => [
                    ['question' => 'Can I customize these workflows?', 'answer' => 'Absolutely! All workflows are fully customizable. you can tweak them to fit your specific requirements.'],
                    ['question' => 'Do I need coding skills?', 'answer' => 'No coding skills are required. Our visual workflow builder allows you to drag and drop components easily.'],
                    ['question' => 'What integrations are supported?', 'answer' => 'We support thousands of integrations including Slack, Gmail, Trello, Asana, and many more via n8n and other providers.']
                ]
            ],
            'Templates' => [
                'slug' => 'templates',
                'title' => 'Template Library',
                'faqs' => [
                    ['question' => 'Are these templates free?', 'answer' => 'Many templates are free to use. Premium templates created by experts are also available for purchase.'],
                    ['question' => 'How do I use a template?', 'answer' => 'Simply click "Use Template" on any template page. It will be copied to your workspace where you can configure it.'],
                    ['question' => 'Can I submit my own templates?', 'answer' => 'Yes, you can contribute to the community by submitting your own successful workflows as templates.']
                ]
            ],
            'Marketing Solutions' => [
                'slug' => 'solutions-marketing', // Mapping based on usage or creating a generic page for it
                'title' => 'Marketing Automation Solutions',
                'faqs' => [
                    ['question' => 'How can this help my marketing agency?', 'answer' => 'Automate client reporting, ad updates, and lead nurturing sequences to save hours every week.'],
                    ['question' => 'Does it integrate with Facebook Ads?', 'answer' => 'Yes, we have deep integrations with Facebook Ads, Google Ads, LinkedIn, and more for seamless automation.'],
                    ['question' => 'Can I automate social media posting?', 'answer' => 'Yes, schedule and automate posts across multiple platforms from a single dashboard.']
                ]
            ],
             'Engineering Solutions' => [
                'slug' => 'solutions-engineering',
                'title' => 'Engineering Ops Automation',
                'faqs' => [
                    ['question' => 'What CI/CD tools do you support?', 'answer' => 'We integrate with GitHub, GitLab, Jenkins, and others to trigger workflows based on build statuses.'],
                    ['question' => 'Can I automate deployment notifications?', 'answer' => 'Yes, automatically notify your team on Slack or Teams when deployments succeed or fail.'],
                    ['question' => 'Is it secure for production access?', 'answer' => 'We use enterprise-grade security and encryption to ensure your production environments remain safe.']
                ]
            ],
            'Sales Solutions' => [
                'slug' => 'solutions-sales',
                'title' => 'Sales & CRM Automation',
                'faqs' => [
                    ['question' => 'Does it sync with Salesforce?', 'answer' => 'Yes, two-way sync with Salesforce, HubSpot, Pipedrive, and other major CRMs is supported.'],
                    ['question' => 'Can I automate lead enrichment?', 'answer' => 'Automatically enrich lead data from Clearbit, Hunter, and LinkedIn when a new lead enters your pipeline.'],
                    ['question' => 'How does it help with follow-ups?', 'answer' => 'Set up automated email sequences that stop when a lead replies, ensuring you never miss a follow-up.']
                ]
            ],
             'Operations Solutions' => [
                'slug' => 'solutions-operations',
                'title' => 'Operations Automation',
                'faqs' => [
                    ['question' => 'Can I automate invoicing?', 'answer' => 'Yes, automatically generate and send invoices based on time tracked or project milestones.'],
                    ['question' => 'How does contract management work?', 'answer' => 'Auto-generate contracts from templates and send them for e-signature using DocuSign or HelloSign.'],
                    ['question' => 'Does it support multi-currency?', 'answer' => 'Yes, our financial automations support multi-currency transactions and conversions.']
                ]
            ],
             'Security Solutions' => [
                'slug' => 'solutions-security',
                'title' => 'Security Operations',
                'faqs' => [
                    ['question' => 'How does log monitoring work?', 'answer' => 'Aggregate logs from multiple sources and set up smart alerts for anomalies or security threats.'],
                    ['question' => 'Can I automate compliance checks?', 'answer' => 'Run automated scripts to verify infrastructure compliance with standards like SOC2 or GDPR.'],
                    ['question' => 'Is there an audit trail?', 'answer' => 'Every execution is logged, providing a complete audit trail for security and compliance purposes.']
                ]
            ],
             'AI Agent Solutions' => [
                'slug' => 'solutions-ai',
                'title' => 'AI Agent Solutions',
                'faqs' => [
                    ['question' => 'What are AI Agents?', 'answer' => 'AI Agents are autonomous workers that can plan and execute complex tasks using LLMs.'],
                    ['question' => 'Can I build my own agents?', 'answer' => 'Yes, use our Agent Builder to define goals, tools, and constraints for your custom AI workforce.'],
                    ['question' => 'What models do you support?', 'answer' => 'We support GPT-4, Claude 3, Llama 3, and other leading models to power your agents.']
                ]
            ],
            'Blogs' => [
                'slug' => 'blogs',
                'title' => 'NexusAI Blog',
                'faqs' => [
                    ['question' => 'How often do you publish?', 'answer' => 'We publish new insights, tutorials, and case studies weekly.'],
                    ['question' => 'Can I write a guest post?', 'answer' => 'We welcome contributions from industry experts. Contact our editorial team for guidelines.'],
                    ['question' => 'Do you cover technical tutorials?', 'answer' => 'Yes, we have a dedicated section for technical deep dives and workflow tutorials.']
                ]
            ],
            'About Us' => [
                'slug' => 'about',
                'title' => 'About NexusAI',
                'faqs' => [
                    ['question' => 'When was NexusAI founded?', 'answer' => 'NexusAI was founded in 2022 by a team of former freelancers and AI engineers.'],
                    ['question' => 'Where are you based?', 'answer' => 'We are a remote-first company with headquarters in San Francisco.'],
                    ['question' => 'Are you hiring?', 'answer' => 'We are always looking for talented individuals. Check our Careers page for open positions.']
                ]
             ],
        ];

        foreach ($pages as $key => $data) {
            // Find or create the page
            $page = Page::firstOrCreate(
                ['slug' => $data['slug']],
                [
                    'title' => $data['title'],
                    'content' => 'Content for ' . $data['title'],
                    'is_active' => true,
                    'meta_title' => $data['title'],
                    'meta_description' => 'Learn more about ' . $data['title'],
                    'meta_keywords' => 'automation, ai, freelance',
                ]
            );

            // Create 3 FAQs for the page if they don't exist
            foreach ($data['faqs'] as $index => $faqData) {
                // Check if this specific question already exists for this page to avoid duplicates on re-seed
                $exists = Faq::where('faqable_id', $page->id)
                             ->where('faqable_type', Page::class)
                             ->where('question', $faqData['question'])
                             ->exists();

                if (!$exists) {
                    $page->faqs()->create([
                        'question' => $faqData['question'],
                        'answer' => $faqData['answer'],
                        'status' => true,
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }
    }
}
