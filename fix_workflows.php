<?php
// Quick fix script to update draft workflows to published
try {
    $db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check current status
    $stmt = $db->query("SELECT id, title, slug, status FROM workflows LIMIT 20");
    $workflows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($workflows)) {
        echo "No workflows found in database.\n";
    } else {
        echo "Current workflows:\n";
        foreach ($workflows as $w) {
            echo "  ID: {$w['id']} | Slug: {$w['slug']} | Status: {$w['status']}\n";
        }

        // Count draft workflows
        $draftCount = $db->query("SELECT COUNT(*) FROM workflows WHERE status = 'draft'")->fetchColumn();
        echo "\nDraft workflows: $draftCount\n";

        // Update all draft workflows to published
        $updated = $db->exec("UPDATE workflows SET status = 'published' WHERE status = 'draft'");
        echo "Updated $updated workflows to 'published'\n";

        // Verify
        $publishedCount = $db->query("SELECT COUNT(*) FROM workflows WHERE status = 'published'")->fetchColumn();
        echo "Published workflows now: $publishedCount\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
